'use strict';
const card = document.getElementById('card'), story = document.getElementById('story');
const retry = document.getElementById('retry');
async function loadCase() {
  retry.hidden = true;
  card.setAttribute('aria-busy', 'true');
  story.textContent = 'Die Geschichte wird geladen …';
  const id = new URLSearchParams(location.search).get('id');
  try {
    if (!id || id.length > 80) { story.textContent = 'Dieser Fall-Link ist unvollständig.'; return; }
    const response = await fetch('https://rfveabdfndzkvttmvnwn.supabase.co/functions/v1/herzgericht-api/public/posts/' + encodeURIComponent(id), {credentials: 'omit', signal: AbortSignal.timeout(15000)});
    if (response.status === 404) { story.textContent = 'Dieser Fall ist nicht mehr verfügbar oder wurde noch nicht freigegeben.'; return; }
    if (!response.ok) throw new Error('Unavailable');
    const post = await response.json();
    document.getElementById('meta').textContent = post.author + ' · ' + post.tag;
    document.getElementById('example').hidden = !post.demo;
    story.textContent = post.body;
  } catch {
    story.textContent = 'Die Geschichte konnte gerade nicht geladen werden.';
    retry.hidden = false;
  } finally { card.setAttribute('aria-busy', 'false'); }
}
retry.addEventListener('click', loadCase);
loadCase();
