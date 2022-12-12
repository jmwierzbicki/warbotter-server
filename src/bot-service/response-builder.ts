export class ResponseBuilder {
  public type = 1;
  public data = {
    content: undefined,
    flags: undefined,
    components: [],
  };

  constructor(type) {
    this.type = type;
    return this;
  }

  public setContent(content) {
    this.data.content = content;
    return this;
  }

  public setEphemeral() {
    this.data.flags = 64;
    return this;
  }

  public addActionRow() {
    this.data.components.push({
      type: 1,
      components: [],
    });
    return this;
  }
  public addButton(label, custom_id, style = 1) {
    const template = {
      type: 2,
      label,
      custom_id,
      style,
    };

    if (
      this.data.components.length === 0 ||
      this.data.components[this.data.components.length-1].components.length === 5
    ) {
      this.addActionRow();
    }

    this.data.components.forEach((row) => {
      if (row.components.length < 5) {
        row.components.push(template);
        return;
      }
    });

    return this;
  }
}
