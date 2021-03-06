// react
import { useState } from 'react'

// third-party
import classNames from 'classnames'

// application
import ProductTabDescription from './ProductTabDescription'
import ProductTabSpecification from './ProductTabSpecification'
import ProductTabReviews from './ProductTabReviews'
import { ProductVariant } from '../../saleor/graphql'
import { IProduct } from '../../interfaces/product'

export interface ProductTabsProps {
  withSidebar?: boolean
  product: IProduct
}

function ProductTabs(props: ProductTabsProps) {
  const { withSidebar = false, product } = props
  const [currentTab, setCurrentTab] = useState('description')

  const classes = classNames('product-tabs', {
    'product-tabs--layout--sidebar': withSidebar,
  })

  const tabs = [
    {
      key: 'description',
      title: 'Description',
      content: <ProductTabDescription description={product.description} />,
    },
    {
      key: 'specification',
      title: 'Specification',
      content: <ProductTabSpecification attributes={product.attributes} />,
    },
  ]

  const tabsButtons = tabs.map(tab => {
    const classes = classNames('product-tabs__item', {
      'product-tabs__item--active': currentTab === tab.key,
    })

    return (
      <button
        key={tab.key}
        type="button"
        onClick={() => setCurrentTab(tab.key)}
        className={classes}
      >
        {tab.title}
      </button>
    )
  })

  const tabsContent = tabs.map(tab => {
    const classes = classNames('product-tabs__pane', {
      'product-tabs__pane--active': currentTab === tab.key,
    })

    return (
      <div key={tab.key} className={classes}>
        {tab.content}
      </div>
    )
  })

  return (
    <div className={classes}>
      <div className="product-tabs__list">{tabsButtons}</div>
      <div className="product-tabs__content">{tabsContent}</div>
    </div>
  )
}

export default ProductTabs
