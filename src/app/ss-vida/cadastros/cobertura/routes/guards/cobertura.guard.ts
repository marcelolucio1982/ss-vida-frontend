import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CoberturaGuard implements CanActivateChild {

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (state.url.includes('editar')) {
            // usuário sem acesso
            // return Observable.of(false);
        }
        return true;
    }

}
