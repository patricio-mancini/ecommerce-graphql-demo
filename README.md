# E-Commerce GraphQL React Demo

This project demonstrates how to use `GraphQL` in an E-Commerce `React` application, showcasing the integration of `Apollo Client` and various `GraphQL` features. The project is bootstrapped with `Create React App`.

## Implementation Details

### Layout

The application features a two-part layout divided into the following sections:

- `Header`: This section includes the main company logo and the `SubTotal` section, which provides information about the `order`. These elements are separated using `Flexbox` to occupy the full width of the bar.
- `Main`: This section contains the primary content of the application, namely the grid of products.

Two important decisions were made regarding the layout:

- The `Header` is made sticky, ensuring it remains visible even when scrolling through the results.
- The scrollbar is only displayed for the `Main` container, enhancing the overall user experience.

### Grid of products

To display the results of querying the `GraphQL` service in a responsive manner within the main container of the application, we opted to utilize the `CSS Grid` layout system. This choice allows us to set up a template that adjusts based on the viewport size, determining how many columns are displayed simultaneously. While `Flexbox` could have been another option, the simplicity of `CSS Grid` made it a preferable choice, avoiding overly complicated layout strategies.

The minimum recommended `width` for the viewport in this implementation is `514px`, which will display the products in a single column.

### Item

This component renders a single unit of an item. The only interactive element is the `Add to Cart` button, which invokes the `addItem` method from the `useOrderState` custom hook, passing the `variantId` as a parameter. It's important to note that this iteration does not allow for setting a custom quantity for each product. Therefore, users need to use the `Add to Cart` button multiple times to add multiple instances of the same product to the `order`.

### SubTotal

This component is rendered as part of the `header` bar. It displays information about the current `order`, showing two main fields:

- `Subtotal`: This is the accumulated amount of money for all the `orderlines` that are part of the current `order`. In this iteration, it is assumed that the currency is USD.
- `Quantity`: This represents the number of products that are part of the `order`.

The order information is obtained by levaraging the `order` property from the `useOrderState` custom hook.

### useOrderState

This custom hook and provider were created to abstract the logic and encapsulate functionality related to adding products to the order and retrieving order information such as `subtotal` and `quantity`. Any part of the app that requires this logic needs only to consume this hook within a component subtree that is a child of the `OrderStateProvider` provider.

This hook invokes a `GraphQL` mutation named `addItemToOrder` whenever the `addItem` function is called, passing the `variantId` as a parameter along with a `quantity` of 1.

Additionally, this hook utilizes a custom implementation of `useState` with local storage capabilities called `useStateWithStorage`. This ensures that even after refreshes, the `subtotal` component will display the latest information that was persisted using this hook.

The `useOrderState` hook provides the following API:

- `order`: an object with the keys `quantity` and `subTotal`.
- `addItem`: a callback that expects a single argument, the `variantId` of the product to be added to the `order`.

### useStateWithStorage

This custom hook implements `useState` while persisting the state in the browser `localstorage`. It expects a `key` as a parameter, which is used as the key in `localstorage` to save/get the information after the app is restarted, along with the `defaultState` value

## Scripts

### `yarn start`

Runs the app in the development mode.

### `yarn test`

Launches the test runner.

