# Hello gpt

Takes user input from terminal and does a similarity search on a faq dataset.
Then it uses GPT to do a final filtering of the results.
The faq dataset is located in experiments/basic/vector-search/faq.json.

Try search for "Info about shipping", "Do you offer discounts?" or "How do I get a refund?".

## Example

```
Search for: info about shipping

Top 10 (of 51) items from Vector search:
Q:[12] What are the shipping costs?
Q:[31] How long does shipping take?
Q:[47] Do you offer expedited shipping?
Q:[2] Do you offer international shipping?
Q:[3] How can I track my order?
Q:[22] Can I pre-order items?
Q:[27] Can I reserve an item to pick up in-store?
Q:[30] Can I customize a product?
Q:[13] Do you offer gift wrapping?
Q:[45] What happens if an item is out of stock after I order?

---

Final filtering from GPT:
Q:[12] What are the shipping costs?
  Shipping costs vary based on location and weight. Please refer to our shipping page for details.
Q:[31] How long does shipping take?
  Standard shipping takes 3-5 business days. Expedited options are also available.
Q:[47] Do you offer expedited shipping?
  Yes, we offer several expedited shipping options at checkout.
Q:[2] Do you offer international shipping?
  Yes, we offer international shipping to over 100 countries.
```