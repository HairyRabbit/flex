import * as React from 'react'
import ReactDOM from 'react-dom/server'
import { foo as Container } from '!babel-loader!../jsx-loader.js!./foo.flex'

export default ReactDOM.renderToStaticMarkup(
  <Container>
    <div>left</div>
    <div>middle</div>
    <div>right</div>
  </Container>
)
