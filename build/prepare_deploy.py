"""Prepare the static course package and an updated copy of the live hub."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import hashlib
import tarfile

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / '.deploy'
OUT.mkdir(exist_ok=True)
pages = [ROOT / name for name in ('index.html', 'home.html', 'bridge.html')]
for subject in ('math', 'physics'):
    pages.extend((ROOT / subject).glob('*.html'))

class Links(HTMLParser):
    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key not in ('href', 'src') or not value:
                continue
            url = urlsplit(value)
            if url.scheme or url.netloc or not url.path or url.path.startswith('/'):
                continue
            target = self.page.parent / unquote(url.path)
            assert target.exists(), f'{self.page}: missing {value}'

for page in pages:
    parser = Links()
    parser.page = page
    parser.feed(page.read_text(encoding='utf-8'))
assert (ROOT / 'index.html').read_bytes() == (ROOT / 'home.html').read_bytes()

original = (ROOT / 'hub-original.html').read_bytes()
hub = original.decode('utf-8')
card = '''    <a class="card" href="high-school/">
      <span class="arrow">&rarr;</span>
      <div class="num">HIGH SCHOOL &middot; COURSE HUB</div>
      <h3>High-School Course Hub</h3>
      <p>Explore physics and mathematics through interactive visualizers, knowledge maps and exam practice. Study in English or Thai, at your own pace.</p>
      <div class="stops"><b>36 chapters</b> &middot; 20 physics + 16 mathematics &middot; cross-subject connections</div>
      <div class="tags"><span class="tag">physics</span><span class="tag">mathematics</span><span class="tag">English / Thai</span></div>
    </a>

'''
marker = '    <div class="card soon">'
assert marker in hub
assert 'href="high-school/"' not in hub
hub = hub.replace(marker, card + marker, 1)
(OUT / 'hub-index.html').write_text(hub, encoding='utf-8', newline='\n')
with tarfile.open(OUT / 'high-school.tar.gz', 'w:gz') as archive:
    for name in ('index.html', 'home.html', 'bridge.html', 'math', 'physics'):
        archive.add(ROOT / name, arcname=name)
print(f'Validated links in {len(pages)} pages; deployment package ready.')
print('Original hub SHA256:', hashlib.sha256(original).hexdigest())
