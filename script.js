
let timer;

function start() {
  const name = document.getElementById('name').value || 'You';
  const bday = document.getElementById('bday').value;

  if (!bday) { alert('Please enter your birthday!'); return; }

  document.getElementById('result').classList.remove('hidden');
  if (timer) clearInterval(timer);

  const inputDate = new Date(bday);

  function update() {
    const now = new Date();

    let next = new Date(now.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    if (next <= now) next.setFullYear(now.getFullYear() + 1);

    const diff = next - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('mins').textContent = mins;
    document.getElementById('secs').textContent = secs;

    // Next birthday date
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('next-date').textContent =
      next.toLocaleDateString('en-IN', options);

    // Age turning
    const age = next.getFullYear() - inputDate.getFullYear();
    document.getElementById('age').textContent = age + ' years old';

    // Message
    const msg = document.getElementById('message');
    if (days === 0 && hours === 0) {
      msg.textContent = '🎉 Happy Birthday, ' + name + '!';
    } else if (days <= 7) {
      msg.textContent = '🎈 ' + name + "'s birthday is very soon!";
      msg.style.display = 'block';
    } else {
      msg.style.display = 'none';
    }
  }

  update();
  timer = setInterval(update, 1000);
}
