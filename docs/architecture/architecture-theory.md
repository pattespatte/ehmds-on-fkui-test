# Architectural Foundations

Our approach to building a product-specific design system on top of a core library (FKUI) is based on the **Layered Design System** model.

## The Design System Ecosystem

According to **Brad Frost**, a design system isn't a single product but an ecosystem. Our "EHMDS" acts as the **Recipe Layer**—a product-specific implementation that uses the "FKUI" as its **Core Layer**.

## Industry Alignment

These theories map directly to established patterns in the design systems community:

| This Pattern | Industry Term | Primary Source |
| :--- | :--- | :--- |
| **Token Override** | Multi-tier Tokens | Nathan Curtis (EightShapes) |
| **Wrapper/Facade** | Adapter Pattern | Structural Design Patterns (GoF) |
| **Extension** | Component Augmentation | IBM Carbon / Nathan Curtis |
| **Composition** | Recipes / Layouts | Brad Frost (Atomic Design) |

### Sources & Further Reading

- [The Design System Ecosystem](https://bradfrost.com/blog/post/the-design-system-ecosystem/) by Brad Frost
- [Multi-tier Token Architecture](https://www.designsystemscollective.com/design-tokens-that-scale-mastering-multi-tier-architecture-for-modern-design-systems-96429b2fcee7/) by Rakesh Kumar
