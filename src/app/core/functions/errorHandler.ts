
import { HttpErrorResponse } from '@angular/common/http'
import { Observable, of as observableOf } from 'rxjs'
import { JnResult } from '../class/results'

export function errorHandler( res: any ): Observable<JnResult> {
    let errors = []

    if ( res instanceof HttpErrorResponse ) {
        if ( res.status == 0 ) {
            errors.push('Verifica tu conexión a internet')
        }

        if ( res.status == 500 ) {
            errors.push('Error en el servidor')
        }

        errors.push(res.error)
    } else {
        console.log(res)
        errors.push('Ocurrio un error desconicido, contacta a un administrador')
    }

    return observableOf(
        new JnResult(
            false,
            res,
            '',
            errors,
            []
        )
    )
}