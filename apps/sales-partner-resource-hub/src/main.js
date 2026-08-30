document.querySelectorAll('input[type="checkbox"]').forEach((box) => box.addEventListener('change', () => box.closest('label').classList.toggle('done', box.checked)));
