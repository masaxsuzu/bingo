import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
    save(key: string, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
    }
    load(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }
}

export const repository = new StorageService();
