import { games, categories } from './games.js';
const grid = document.querySelector('#games-grid'), search = document.querySelector('#search'), results = document.querySelector('#results'), empty = document.querySelector('#empty'), reset = document.querySelector('#reset');
const state = { query:'',course:'all',topic:'all' };
const categoryNames = new Map(categories.map(c => [c.id,c.label]));
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function courseMatches(game) {
 if(state.course === 'all') return true;
 return game.courses.some(c => state.course === 'IGCSE' ? c.includes('IGCSE') || c === 'Foundation' : state.course === 'A level' ? c.includes('A level') : c === state.course);
}
function matches(game) {
 const haystack = [game.title,game.desc,categoryNames.get(game.category),...game.topics,...game.courses].join(' ').toLocaleLowerCase();
 return haystack.includes(state.query.trim().toLocaleLowerCase()) && courseMatches(game) && (state.topic === 'all' || state.topic === game.category);
}
function card(game) {
 const cat = categoryNames.get(game.category);
 const target = 'target="_blank" rel="noopener noreferrer"';
 return '<article class="card"><a href="'+esc(game.url)+'" '+target+' class="card-image" aria-label="Play '+esc(game.title)+' (opens a new tab)"><img src="'+esc(game.image)+'" alt="Illustrated promotional preview for '+esc(game.title)+'" loading="lazy" width="640" height="360"><span class="category">'+esc(cat.toUpperCase())+'</span></a><div class="card-body"><h3>'+esc(game.title)+'</h3><p class="desc">'+esc(game.desc)+'</p><div class="tags">'+game.courses.map(c=>'<span>'+esc(c)+'</span>').join('')+'</div><p class="topics">TOPICS · '+esc(game.topics.join(' · '))+'</p><a class="play-link" href="'+esc(game.url)+'" '+target+'>Play game <span aria-hidden="true">↗</span><span class="sr-only"> '+esc(game.title)+' (opens a new tab)</span></a></div></article>';
}
function render() {
 const shown=games.filter(matches);
 grid.innerHTML=shown.map(card).join('');
 results.textContent='Showing '+shown.length+' of '+games.length+' games';
 empty.hidden=shown.length!==0;
 reset.hidden=!(state.query.trim() || state.course!=='all' || state.topic!=='all');
 for(const prop of ['course','topic']) document.querySelectorAll('#'+prop+'-filters button').forEach(b => {
 const active=b.dataset[prop]===state[prop]; b.classList.toggle('active',active); b.setAttribute('aria-pressed',String(active));
 });
}
function clear(){state.query='';state.course='all';state.topic='all';search.value='';render();search.focus();}
search.addEventListener('input',()=>{state.query=search.value;render();});
for(const prop of ['course','topic']) document.querySelector('#'+prop+'-filters').addEventListener('click',event=>{const b=event.target.closest('button[data-'+prop+']');if(b){state[prop]=b.dataset[prop];render();}});
reset.addEventListener('click',clear);document.querySelector('#empty-reset').addEventListener('click',clear);
document.querySelector('#year').textContent=new Date().getFullYear();
render();