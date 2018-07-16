export abstract class Paginable {

    loading = false;
    total = 0;
    page = 1;
    limit = 10;

    abstract pesquisar(): void;

    goToPage(n: number): void {
        this.page = n;
        this.pesquisar();
    }

    onNext(): void {
        this.page++;
        this.pesquisar();
    }

    onPrev(): void {
        this.page--;
        this.pesquisar();
    }
}
