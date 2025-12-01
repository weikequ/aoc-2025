export async function getInput(num: number) {
  const file = Bun.file(`input/${num.toString()}.txt`);
  const input = (await file.text()).split("\r\n");
  return input;
}

export class Logger {
  private entries: string[];
  private name: string;

  constructor(name: string) {
    this.name = name;
    this.entries = [];
  }

  log(entry: string) {
    this.entries.push(entry);
  }

  print() {
    Bun.write(`log/${this.name}.txt`, this.entries.join("\n"));
  }
}
