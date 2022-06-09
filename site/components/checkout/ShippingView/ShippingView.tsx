import { FC } from 'react'
import cn from 'clsx'

// import Button from '@components/ui/Button'
// import { useUI } from '@components/ui/context'
// import SidebarLayout from '@components/common/SidebarLayout'
// import useAddAddress from '@framework/customer/address/use-add-item'

// import s from './ShippingView.module.css'

// interface Form extends HTMLFormElement {
//   cardHolder: HTMLInputElement
//   cardNumber: HTMLInputElement
//   cardExpireDate: HTMLInputElement
//   cardCvc: HTMLInputElement
//   firstName: HTMLInputElement
//   lastName: HTMLInputElement
//   company: HTMLInputElement
//   streetNumber: HTMLInputElement
//   zipCode: HTMLInputElement
//   city: HTMLInputElement
//   country: HTMLSelectElement
// }

const ShippingView: FC = () => {
  // const { setSidebarView } = useUI()
  // const addAddress = useAddAddress()

  // async function handleSubmit(event: React.ChangeEvent<Form>) {
  //   event.preventDefault()

  //   await addAddress({
  //     type: event.target.type.value,
  //     firstName: event.target.firstName.value,
  //     lastName: event.target.lastName.value,
  //     company: event.target.company.value,
  //     streetNumber: event.target.streetNumber.value,
  //     apartments: event.target.streetNumber.value,
  //     zipCode: event.target.zipCode.value,
  //     city: event.target.city.value,
  //     country: event.target.country.value,
  //   })

  //   setSidebarView('CHECKOUT_VIEW')
  // }

  return (
    <div>Hello from ShippingView</div>
  )
}

export default ShippingView
