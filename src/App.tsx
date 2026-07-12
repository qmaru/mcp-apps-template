import { useState } from "react"

import type { CallToolResult } from "@modelcontextprotocol/sdk/types"

import { useMcpApp } from "@/hooks"

import "@/App.css"

function App() {
  const [result, setResult] = useState<CallToolResult | null>(null)

  const { app, error } = useMcpApp({
    appInfo: {
      name: "mcp-apps-template",
      version: "1.0.0",
    },
    onToolResult: async (toolResult) => {
      console.info("Received tool result:", toolResult)
      setResult(toolResult)
    },
    onToolCancelled: (params) => {
      console.info("Tool call cancelled:", params.reason)
    },
    onError: (err) => {
      console.error(err)
    },
  })

  if (error) {
    return (
      <div className="container">
        <div className="card card--error">
          <h2>Connection Failed</h2>
          <p>{error.message}</p>
        </div>
      </div>
    )
  }

  if (!app) {
    return (
      <div className="container">
        <div className="card">
          <h2>Connecting…</h2>
          <p>Establishing connection with the host.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="card">
        <h2>MCP App</h2>
        <p>Connected to the host. Waiting for a tool result.</p>
      </div>

      {result ? (
        <div className="card">
          <h2>Result</h2>
          <pre className="result">{JSON.stringify(result, null, 2)}</pre>
        </div>
      ) : null}
    </div>
  )
}

export default App
