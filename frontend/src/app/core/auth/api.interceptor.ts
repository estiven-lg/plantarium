import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    const url = req.url.startsWith('http') ? req.url : `${environment.apiUrl}${req.url}`;

    const modifiedReq = req.clone({
        url,
        setHeaders: {
            'X-App-Name': 'Plantarium-Web',
            'Accept-Language': 'es-GT',

        }
    });

    return next(modifiedReq);
};