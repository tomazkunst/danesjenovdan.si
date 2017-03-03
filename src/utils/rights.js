const rights = [
  { value: 'a', label: 'Pravica do dobrega življenja in solidarne družbe' },
  { value: 'b', label: 'Pravica do skupnega' },
  { value: 'c', label: 'Pravica do dobre politične oblasti' },
  { value: 'd', label: 'Pravica (do) narave' },
  { value: 'e', label: 'Pravica do človeku prijazne ekonomije' },
  { value: 'f', label: 'Pravica do vključenosti' },
];

function getRightFromLetter(letter) {
  const r = rights.find(e => e.value === letter);
  if (r) {
    return r.label;
  }
  return null;
}

export {
  rights,
  getRightFromLetter,
};