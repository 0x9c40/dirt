class First {
  constructor(name) {
    this.name = name;
  }

  show_name() {
    console.log(this.name);
  }
}

class Second extends First {}

const second = new Second("John");
second.show_name();
