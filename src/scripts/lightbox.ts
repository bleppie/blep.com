// Click any image in the main column to view it large; arrows step through
// the images on the page, Esc or a click closes.
const imgs = () => [...document.querySelectorAll<HTMLImageElement>('.blocks img[data-full]')];
let dlg: HTMLDialogElement | null = null;
let current = 0;

function show(i: number) {
  const list = imgs();
  current = (i + list.length) % list.length;
  const img = list[current];
  dlg!.querySelector('img')!.src = img.dataset.full!;
  dlg!.querySelector('p')!.textContent = img.dataset.caption || '';
}

document.addEventListener('click', (e) => {
  const img = (e.target as Element).closest<HTMLImageElement>('.blocks img[data-full]');
  if (!img) return;
  if (!dlg) {
    dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.innerHTML = '<img alt=""><p></p>';
    dlg.addEventListener('click', () => dlg!.close());
    document.body.append(dlg);
  }
  show(imgs().indexOf(img));
  dlg.showModal();
});
document.addEventListener('keydown', (e) => {
  if (!dlg?.open) return;
  if (e.key === 'ArrowRight') show(current + 1);
  if (e.key === 'ArrowLeft') show(current - 1);
});
