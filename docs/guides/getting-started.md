---
title: Getting Started
visible: true
---

# Getting Started

Welcome to the EHMDS on FKUI Test documentation! This project demonstrates how to use the docs-generator package to create documentation for Vue components.

## Installation

```bash
npm install
```

## Development

To start the development server:

```bash
npm run start:demo
```

## Components

This project includes several example components:

- {@link Button} - A customizable button component
- {@link Card} - A card component for displaying content

## Example Usage

```vue
<template>
  <div>
    <Button variant="primary" @click="handleClick">
      Click me!
    </Button>
    
    <Card title="Example Card">
      <p>This is some content inside the card.</p>
    </Card>
  </div>
</template>

<script setup>
import { Button, Card } from '@ehmds/design-system';

function handleClick() {
  console.log('Button clicked!');
}
</script>
```

## Styling

The components use FKUI design tokens and can be customized using CSS variables and SCSS.
