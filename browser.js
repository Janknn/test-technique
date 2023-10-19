async function test(quantity) {
  const data = await (await fetch('/api/visas/examples?quantity=' + quantity)).json();
  const result = await (await fetch('/api/visas/stats', {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify(data)
  })).json();
  console.log(data, result);
}