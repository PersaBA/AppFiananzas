class Autocomplete {
  constructor(inputId, suggestionsId, saveId) {
    this.input = document.getElementById(inputId);
    this.suggestionsId = suggestionsId;
    this.saveId = saveId;
    this.maxSuggestions = 10;
    this.suggestions = JSON.parse(localStorage.getItem(this.suggestionsId)) || [];
    this.render();
    this.input.addEventListener('input', this.render.bind(this));
    this.input.addEventListener('focus', this.render.bind(this));

    document.getElementById(this.saveId).addEventListener('click', this.save.bind(this));
  }
  save() {
    this.suggestions = [this.input.value, ...this.suggestions.filter(suggestion => suggestion !== this.input.value)].slice(0, this.maxSuggestions);
    localStorage.setItem(this.suggestionsId, JSON.stringify(this.suggestions));
    this.render();
  }

  removeSuggestion(event) {
    const index = Number(event.target.dataset.index);
    this.suggestions.splice(index, 1);
    localStorage.setItem(this.suggestionsId, JSON.stringify(this.suggestions));
    this.render();
  }

  filterSuggestions() {
    const value = this.input.value.toLowerCase();
    return this.suggestions.filter((suggestion) => suggestion.toLowerCase().startsWith(value));
  }

  render() {
    if (!this.input || !this.input.value) {
      this.renderList([]);
      return;
    }
    const filteredSuggestions = this.filterSuggestions();
    this.renderList(filteredSuggestions.slice(0, this.maxSuggestions));
  }
  renderList(suggestions) {
    const list = document.getElementById(this.suggestionsId);
    if (!list) {
      console.error(`No se pudo encontrar un elemento con id "${this.suggestionsId}"`);
      return;
    }
    list.innerHTML = '';
    suggestions.forEach((suggestion, index) => {
      const item = document.createElement('li');
      item.textContent = suggestion;
      item.addEventListener('click', () => {
        this.input.value = suggestion;
        this.renderList([]);
      });
      const removeButton = document.createElement('button');
      removeButton.textContent = 'x';
      removeButton.dataset.index = index;
      removeButton.addEventListener('click', this.removeSuggestion.bind(this));
      item.appendChild(removeButton);
      list.appendChild(item);
    });
  }
}