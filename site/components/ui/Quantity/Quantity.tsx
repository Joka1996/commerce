import React, { FC } from 'react'
import s from './Quantity.module.css'
import { Cross, Plus, Minus } from '@components/icons'
import cn from 'clsx'
import AddToCart from '@framework/api/endpoints/AddToCart'
import RemoveCart from '@framework/api/endpoints/RemoveCart'

export interface QuantityProps {
  value: number
  handleAdditem: React.MouseEventHandler<HTMLButtonElement>
  // RemoveCart: () => any
  increase: () => any
  decrease: () => any
  handleRemove: React.MouseEventHandler<HTMLButtonElement>
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  max?: number
}

const Quantity: FC<QuantityProps> = ({
  value,
  increase,
  decrease,
  handleChange,
  handleRemove,
  handleAdditem,
  max = 99,
}) => {

  return (
    <div className="flex flex-row h-9">
      <button className={s.actions} onClick={handleRemove}>
        <Cross width={20} height={20} />
      </button>
      <label className="w-full border-accent-2 border ml-2">
        <input
          className={s.input}
          onChange={(e) =>
            Number(e.target.value) < max + 1 ? handleChange(e) : () => {}
          }
          value={value}
          type="number"
          max={max}
          min="0"
          readOnly
        />
      </label>
      <button
        type="button"
        onClick={decrease}
        className={s.actions}
        style={{ marginLeft: '-1px' }}
        disabled={value <= 1}
      >
        <Minus width={18} height={18} />
      </button>
      <button
        type="button"
        onClick={increase}
        className={cn(s.actions)}
        style={{ marginLeft: '-1px' }}
        disabled={value <= 0  || value >= max}
      >
        <Plus width={18} height={18} />
      </button>
    </div>
  )
}

export default Quantity
