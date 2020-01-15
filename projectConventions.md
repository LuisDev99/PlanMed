# Project Conventions

Here we list the conventions followed in this project in order to mantain consistency
across every file and for better understanding on how to do things and hopefully make
easier to find things for new developers.

## General Conventions

### Importing files convention

**This convention is optional** 

Every module (that is, package or a component) imported inside a js file follows the **following order**:

1. Any **React** related package should be imported first

2. Any **Material UI** component **OR any external** component from a third party library should be imported next

3. Any **Custom component OR file (that is, utilities or css files)** should be imported next

4. Any **Graphql related package OR file** should be imported at last


## Components conventions

Every component that is inside the "components" folder follows the following convention(s): 

### Defining the prop's Types

**ANY** component that receives props **SHOULD** define the prop's properties type using propTypes package in order to have a clean API and for fast development

**For Example**

Consider the next code (it does not use propTypes):

```javascript
import React from 'react';

export default function SimpleComponent(props) {
    return <div> {props.thing} </div>
}
```

In the code above, the _SimpleComponent_ receives props and later renders the _thing_ prop.
It is unclear what type is the _thing_ prop. And if we try to use this _SimpleComponent_ elsewhere,
the ones implementing this _SimpleComponent_ won't know what to pass to this component. 

Now consider this (using propTypes):

```javascript
import React from 'react';
import PropTypes from 'prop-types';

export default function SimpleComponent(props) {
    return <div> {props.thing} </div>
}

SimpleComponent.propTypes = {
    thing: PropTypes.string,
};
```

With this approach, we know what _thing_'s type is. Anyone implementing this _SimpleComponent_
will now know what to pass to the _SimpleComponent_ .

Visit the official propType documentation to know how to use propTypes: https://github.com/facebook/prop-types


## Pages Conventions

Every "page" that inside the "pages" folder follows the following convention(s):

### Documenting/commenting state variables

**ANY** variable that is a **state** variable should describe its purpose or functionality and optionally describe on what action it will be changing its state


## GRAPHQL Conventions

Any graphql query/mutation should be inside the "graphql/queries/" folder. They follow the following convention(s):

### Implementing a new query

**ANY** query/mutation **SHOULD** comment out in what file(s) they are going to be used, in other words, create a multiline comment and inside of it, add the files that depends on this new query/mutation. 

The reason behind this is to be able to adapt fast and easy from any change from the backend and to be able to easily find and change an old schema instead of going through the entire project looking for this query/mutation that may or may not change, and in result, this will prevent any bugs or crashes in the UI. Hopefully this makes sense to you.

The Apollo framework provides a nice Visual Studio Code extension that notifies any change from the graphql API, but that creates a dependency in a text editor extension!! Which it is not acceptable in any way and in any kind of software development.

### Changing an existing query

Whenever **ANY** existing query/mutation needs to be changed (that is, the schema changed in the graphql API) because of a change in the backend's graph schema definition, **UPDATE** in every dependency the new query/mutation schema  

