import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { from, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: MsalService,) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Define los scopes para las API protegidas
    //const scopes = ['https://https://berfiresolutiondev.b2clogin.com/berfiresolutiondev.onmicrosoft.com/api/scope'];
    const scopes = [''];

    const account = this.authService.instance.getActiveAccount();

    if (!account) {
      // Si no hay un usuario activo, continúa sin agregar el token
      return next.handle(request);
    }

    // Obtener el token silenciosamente
    const tokenRequest = {
      scopes: scopes,
      account: account
    };

    return from(this.authService.acquireTokenSilent(tokenRequest)).pipe(
      switchMap((tokenResponse) => {
        // Clonar la solicitud e incluir el token en el header Authorization
        const clonedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${tokenResponse.accessToken}`
          }
        });
        return next.handle(clonedRequest);
      }),
      catchError((error) => {
        if (error.name === 'InteractionRequiredAuthError') {
          // Redirigir el usuario a iniciar sesión nuevamente
          this.authService.acquireTokenRedirect(tokenRequest);
        }
        throw error;
      })
    );
  }
}
