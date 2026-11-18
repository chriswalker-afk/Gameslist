import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { games, categories } from '../games.js';

const expected = ['ink','index','quadratics','nova','pileup','bloop','shadow','snow','sampling','lds','words'];
test('all eleven selected sites appear exactly once', () => {
 assert.equal(games.length, 11);
 assert.deepEqual(games.map(g => g.id), expected);
 assert.equal(new Set(games.map(g => g.url)).size, 11);
});
test('all metadata and local previews are valid', () => {
 const ids = new Set(categories.map(c => c.id));
 for(const game of games) {
  assert.ok(ids.has(game.category), game.id);
  assert.ok(game.title.length > 3 && game.desc.length > 60, game.id);
  assert.ok(game.topics.length && game.courses.length, game.id);
  assert.match(game.url, /^https:\/\//);
  assert.match(game.image, /^\.\/assets\/previews\/[a-z]+\.svg$/);
  assert.ok(existsSync(new URL('../'+game.image, import.meta.url)),game.image);
 }
});
test('page has search, filter, accessibility and result elements', () => {
 const html=readFileSync(new URL('../index.html', import.meta.url),'utf8');
 for(const id of ['search','course-filters','topic-filters','games-grid','results','empty']) assert.ok(html.includes('id="'+id+'"'),id);
 assert.ok(html.includes('href="#games"'));
 assert.ok(html.includes('name="viewport"'));
});
test('unselected unfinished games are absent', () => {
 assert.ok(!games.some(g=>/Yangzhou|Graphlings|RogueMaths/i.test(g.title)));
});
