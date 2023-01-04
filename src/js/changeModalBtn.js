export function changeBtnStyle (targetBtn, keyLS) {
    targetBtn.style.color = isAdded ? '#fff' : '';
    targetBtn.style.backgroundColor = isAdded ? '#ff6b08' : '';
    targetBtn.textContent = isAdded ? `remove from ${keyLS}` : `add to ${keyLS}`
    isAdded = false;
}