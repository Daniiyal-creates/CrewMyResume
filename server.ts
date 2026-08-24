import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { CrewOrchestrator } from './server/agents/crew.js';
import { SAMPLE_PROFILES } from './server/sampleData.js';
import { AGENT_DEFINITIONS } from './server/agents/definitions.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // API Route: Health
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'CrewMyResume Multi-Agent Orchestrator',
      timestamp: new Date().toISOString(),
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    });
  });

  // API Route: Get Agent Definitions
  app.get('/api/agents', (_req, res) => {
    res.json({
      agents: AGENT_DEFINITIONS,
      workflow: [
        { step: 1, agent: 'analyzer', mode: 'sequential', output: 'structured_context' },
        { step: 2, agents: ['strategist', 'ats_optimizer'], mode: 'concurrent', output: 'optimized_content_and_ats' },
        { step: 3, agent: 'designer', mode: 'sequential', output: 'final_layout_schema' },
        { step: 4, agent: 'qa', mode: 'sequential', output: 'qa_certification_and_polish' },
      ],
    });
  });

  // API Route: Sample Data
  app.get('/api/sample-data', (_req, res) => {
    res.json({ profiles: SAMPLE_PROFILES });
  });

  // API Route: Standard Orchestration
  app.post('/api/orchestrate', async (req, res) => {
    try {
      const input = req.body;
      if (!input || !input.personalInfo) {
        return res.status(400).json({ error: 'Invalid user input data. Personal information required.' });
      }

      const orchestrator = new CrewOrchestrator();
      const result = await orchestrator.runPipeline(input);
      res.json(result);
    } catch (err: any) {
      console.error('Orchestration pipeline error:', err);
      res.status(500).json({
        error: 'Failed to orchestrate resume crew',
        message: err.message || 'Unknown internal error',
      });
    }
  });

  // API Route: Server-Sent Events (SSE) Streaming Orchestration
  app.post('/api/orchestrate/stream', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    const sendEvent = (event: string, data: any) => {
      res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    };

    try {
      const input = req.body;
      if (!input || !input.personalInfo) {
        sendEvent('error', { message: 'Invalid user input data.' });
        return res.end();
      }

      const orchestrator = new CrewOrchestrator(
        (log) => {
          sendEvent('agent_log', log);
        },
        (agentId, status) => {
          sendEvent('agent_status', { agentId, status });
        }
      );

      sendEvent('pipeline_started', { timestamp: new Date().toISOString() });
      const result = await orchestrator.runPipeline(input);
      sendEvent('pipeline_completed', result);
      res.end();
    } catch (err: any) {
      console.error('SSE Stream error:', err);
      sendEvent('error', { message: err.message || 'Stream processing failure' });
      res.end();
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CrewMyResume Multi-Agent Server running on http://localhost:${PORT}`);
  });
}

startServer();
