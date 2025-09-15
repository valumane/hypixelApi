const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');

function load(file, globals) {
    const context = vm.createContext(globals);
    vm.runInContext(readFileSync(join(__dirname, '..', 'script', file), 'utf8'), context);
    return context;
}

test('collections handle missing counts, exact thresholds, and completion', () => {
    let rendered;
    const context = load('Collection.js', {
        formatNombre: String,
        createFarmingdiv: (...args) => { rendered = args; }
    });
    const items = { WHEAT: { name: 'Wheat', tiers: [100, 200, 1000].map(amountRequired => ({ amountRequired })) } };
    for (const [count, percentage, progress, tier] of [
        [undefined, '0%', '0/100', 0],
        [0, '0%', '0/100', 0],
        [-1, '0%', '0/100', 0],
        [NaN, '0%', '0/100', 0],
        [99, '99%', '99/100', 0],
        [100, '50%', '100/200', 1],
        [200, '20%', '200/1000', 2],
        [999, '99%', '999/1000', 2],
        [1000, '100%', 'collected:1000', 3],
        [1500, '100%', 'collected:1500', 3]
    ]) {
        context.allCollected = { WHEAT: count };
        context.getItems('farming', 'WHEAT', items);
        assert.deepEqual(rendered, ['farming', 'Wheat', percentage, progress, tier]);
    }
    context.allCollected = undefined;
    context.getItems('farming', 'WHEAT', items);
    assert.equal(rendered[2], '0%');
});

test('skills handle level boundaries and cap excess without NaN', () => {
    let rendered;
    const context = load('profile.js', {
        createSkilldiv: (...args) => { rendered = args; }
    });
    for (const [xp, percentage, level] of [
        [undefined, '0%', 0], [NaN, '0%', 0], [Infinity, '0%', 0],
        [-10, '0%', 0], [0, '0%', 0], [50, '50%', 0],
        [99.9, '99%', 0], [100, '0%', 1], [200, '50%', 1],
        [300, '100%', 2], [1000, '100%', 2]
    ]) {
        context.getlevel('mining', xp, [100, 200]);
        assert.deepEqual(rendered, ['miningSkill', percentage, level]);
    }
});
