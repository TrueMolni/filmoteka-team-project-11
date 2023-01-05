export function changeBtnStyle (targetBtn, keyLS) {
    targetBtn.style.color = isAdded ? '#fff' : '#000000';
    targetBtn.style.backgroundColor = isAdded ? '#ff6b08' : 'transparent';
    targetBtn.textContent = isAdded ? `remove from ${keyLS}` : `add to ${keyLS}`
    isAdded = false;
}