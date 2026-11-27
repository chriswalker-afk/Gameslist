import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { games, categories } from '../games.js';

const expected = ['ink','index','quadratics','nova','balance','cannongraphs','pileup','bloop','shadow','snow','sampling','lds','words'];
test('all thirteen selected sites appear exactly once', () => {
 assert.equal(games.length, 13);
 assert.deepEqual(games.map(g => g.id), expected);
 assert.equal(new Set(games.map(g => g.url)).size, 13);
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

test('balance game is listed with its production URL and algebra filters', () => {
 const game = games.find(g => g.id === 'balance');
 assert.equal(game.url, 'https://balance.mrwalkermaths.com/');
 assert.equal(game.category, 'algebra');
 assert.ok(game.courses.includes('KS3') && game.courses.includes('IGCSE 4MA1'));
});
test('static game totals match the catalogue', () => {
 const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
 assert.ok(html.includes(`Explore ${games.length} original maths games`));
 assert.ok(html.includes(`${games.length} original games`));
 assert.ok(html.includes(`Showing ${games.length} games`));
});

test('Cannon Graphs uses its custom domain and graphing curriculum tags', () => {
 const game = games.find(g => g.id === 'cannongraphs');
 assert.equal(game.url, 'https://cannongraphs.mrwalkermaths.com/');
 assert.equal(game.category, 'algebra');
 for (const course of ['KS3', 'IGCSE 4MA1', 'A level 9MA0']) assert.ok(game.courses.includes(course));
 for (const topic of ['Graph sketching', 'Gradients', 'Quadratic graphs', 'Functions']) assert.ok(game.topics.includes(topic));
});
