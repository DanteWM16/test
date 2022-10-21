import { AbstractControl, ValidationErrors } from '@angular/forms';
export default class CustomValidators {
  
    static passwordMatchValidator( control: AbstractControl ) {
        const password: string = control.get('password')?.value
        const confirmPassword: string = control.get('confirmPassword')?.value
    
        if ( password !== confirmPassword ) {
          control.get('confirmPassword')?.setErrors({ NoPasswordMatch: true })
        }
      }

    static cardMatchValidator( control: AbstractControl ) {
      const cardNumber: string = control.get('cardNumber')?.value
      const VISA = /^4[0-9]{3}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}$/
      const MASTERCARD = /^5[1-5][0-9]{2}-?[0-9]{4}-?[0-9]{4}-?[0-9]   {4}$/
      const AMEX = /^3[47][0-9-]{16}$/
  
      if (luhn(cardNumber) ) {
        if( !cardNumber.match(VISA) && !cardNumber.match(MASTERCARD) && !cardNumber.match(AMEX) ) {
          control.get('cardNumber')?.setErrors({ incorrectCardNumber: true })
        }
      }
    }

}

function luhn(valor: string ) {
  if (/[^0-9-\s]+/.test(valor) ) return false

  let nCheck = 0, bEven = false

  valor = valor.replace(/\D/g, "")
  for(let n = valor.length -1; n >= 0; n--) {
    let cDigit = valor.charAt(n)
    let nDigit = parseInt(cDigit, 10)
    if (bEven && (nDigit *= 2 ) > 9) nDigit -= 9; nCheck += nDigit; bEven = !bEven
    return ( nCheck % 10 ) == 0
  }
  return false
}

