const key = 'github.com/masaxsuzu/bingo';

class Repository {
    save(data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
    }
    load(): any {
        return JSON.parse(localStorage.getItem(key));
    }
}

export const repository = new Repository();
