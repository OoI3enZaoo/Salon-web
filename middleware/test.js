export default function ({isServer, store, req }) {
  if (isServer && !req) return
  console.log("Hello World na: ")

}
