import { useState, useMemo, useRef, useEffect } from "react";
import {
  Button, TextField, Card, CardContent, Typography, AppBar, Toolbar,
  Container, Box, IconButton, CssBaseline, useMediaQuery, createTheme,
  ThemeProvider, Grow, Tabs, Tab, CircularProgress, LinearProgress
} from "@mui/material";
import { GitHub, LinkedIn, Email, Brightness4, Brightness7, Download } from "@mui/icons-material";
import { Masonry } from '@mui/lab';
import emailjs from '@emailjs/browser';

export default function PortfolioBlog() {
  const [darkMode, setDarkMode] = useState(useMediaQuery('(prefers-color-scheme: dark)'));
  const [tab, setTab] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);  
  const [loading, setLoading] = useState(true);
  const [downloadCount, setDownloadCount] = useState(() => {
    return parseInt(localStorage.getItem("resumeDownloads") || 0);
  });

  const formRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#1976d2' },
    },
  }), [darkMode]);

  const projects = [
    { title: "Dynamic Schema Validator", url: "https://github.com/adashexplorer/dynamic-schema-validator" },
    { title: "Real-time Notification System", url: "https://github.com/adashexplorer/notification-service" },
    { title: "Custom Analytics Backend", url: "https://github.com/adashexplorer/custom-analytics-backend" }
  ];

  const blogPosts = [
    { title: "Scaling a Notification System", url: "https://github.com/adashexplorer/notification-service/blob/main/README.md" },
    { title: "Kafka vs RabbitMQ", url: "https://github.com/adashexplorer/kafka-vs-rabbitmq/blob/main/README.md" },
    { title: "Spring Boot API Patterns", url: "https://github.com/adashexplorer/spring-boot-api-patterns/blob/main/README.md" }
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      'service_73dljle',
      'template_ohx24dh',
      formRef.current,
      'iuOw_bKmUTX4yraql'
    ).then(
      () => {
        alert("Message sent successfully!");
        formRef.current.reset();
      },
      (error) => {
        alert("Failed to send message. Please try again.");
        console.error("EmailJS error:", error);
      }
    );
  };

  const handleDownload = () => {
    setDownloading(true);
    setProgress(0);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/Sample_pdf_download.pdf", true);
    xhr.responseType = "blob";

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = () => {
      const url = window.URL.createObjectURL(xhr.response);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Abinash_Dash_Resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      setDownloading(false);

      const prev = parseInt(localStorage.getItem("resumeDownloads") || 0);
      const newCount = prev + 1;
      localStorage.setItem("resumeDownloads", newCount);
      setDownloadCount(newCount);
    };

    xhr.onerror = () => {
      alert("Download failed. Please try again.");
      setDownloading(false);
    };

    xhr.send();
  };

  const loadingMessages = [
    "Coffee to Code Ratio...",
    "Booting up Abinash Dash’s brain... 🧠⚡",
    "Loading Abinash Dash... Coffee to Code ratio... ☕💻",
    "Debugging life one breakpoint at a time... 🐞🔧",
    "Deploying portfolio microservice... 🚀🌐",
    "Compiling passion into code... ❤️💻",
    "Making API calls to imagination... 🔮📡"
  ];

  const randomMessage = useMemo(() => {
    return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
  }, []);

  const charCount = randomMessage.length;

  if (loading) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', color: 'text.primary', textAlign: 'center' }}>
        <Box sx={{ width: 100, height: 100, borderRadius: '50%', border: '6px solid transparent', borderTop: '6px solid #1976d2', animation: 'spin 1.5s linear infinite, glow 1.5s ease-in-out infinite', mb: 3 }} />
        <Typography variant="h6" sx={{ fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden', borderRight: '2px solid', animation: `typing steps(${charCount}) 3s, blink 0.75s step-end infinite alternate`, maxWidth: `${charCount}ch` }}>
          {randomMessage}
        </Typography>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 10px #1976d2, 0 0 20px #1976d2; }
            50% { box-shadow: 0 0 20px #42a5f5, 0 0 30px #42a5f5; }
          }
          @keyframes typing {
            from { width: 0 }
            to { width: ${charCount}ch }
          }
          @keyframes blink {
            50% { border-color: transparent }
          }
        `}</style>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: "background.default", color: "text.primary", minHeight: "100vh" }}>
        <AppBar position="sticky" color="primary">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Abinash</Typography>
            <IconButton sx={{ mr: 2 }} onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" href="#about">About</Button>
              <Button color="inherit" href="#projects-blog" onClick={() => setTab(0)}>Projects</Button>
              <Button color="inherit" href="#projects-blog" onClick={() => setTab(1)}>Blog</Button>
              <Button color="inherit" href="#contact">Contact</Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Hero Section with Download Features */}
        <Box sx={{ py: 10, textAlign: "center", bgcolor: "primary.main", color: "white" }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">Hi, I'm Abinash Dash 👋</Typography>
          <Typography variant="h6">Senior Backend Developer | Java | Spring Boot | System Design</Typography>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleDownload}
              disabled={downloading}
            >
              Download Resume
            </Button>

            {downloading && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress variant="determinate" value={progress} />
                <Typography variant="body2" align="center">{progress}% Downloaded</Typography>
              </Box>
            )}

            <Typography variant="body2" sx={{ mt: 2 }}>
              📅 Last updated on: <strong>Aug 1, 2025</strong>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              📥 Total Downloads: <strong>{downloadCount}</strong>
            </Typography>
          </Box>
        </Box>

        {/* About Section */}
        <Container id="about" sx={{ py: 10 }}>
          <Grow in timeout={800}>
            <Box>
              <Typography variant="h4" align="center" color="primary" gutterBottom>About Me</Typography>
              <Typography align="center" sx={{ maxWidth: 700, mx: "auto" }}>
                Passionate backend engineer with 7+ years building scalable systems in Java. I specialize in distributed architecture, clean code, and solving real-world engineering challenges.
              </Typography>
            </Box>
          </Grow>
        </Container>

        {/* Projects & Blog Tabs */}
        <Container id="projects-blog" sx={{ py: 10 }}>
          <Tabs value={tab} onChange={(e, val) => setTab(val)} centered>
            <Tab label="Projects" />
            <Tab label="Blog Posts" />
          </Tabs>

          {tab === 0 && (
            <Masonry columns={{ xs: 1, sm: 2 }} spacing={3} sx={{ mt: 4 }}>
              {projects.map((project, i) => (
                <Card elevation={3} key={i}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>{project.title}</Typography>
                    <Typography variant="body2" gutterBottom>
                      A modern backend tool built with Java, Spring Boot, and microservices architecture.
                    </Typography>
                    <Button size="small" href={project.url} target="_blank">View Project →</Button>
                  </CardContent>
                </Card>
              ))}
            </Masonry>
          )}

          {tab === 1 && (
            <Masonry columns={{ xs: 1, sm: 2 }} spacing={3} sx={{ mt: 4 }}>
              {blogPosts.map((post, i) => (
                <Card elevation={2} key={i}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{post.title}</Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      A deep dive into backend strategies, performance tuning, and resilient design patterns.
                    </Typography>
                    <Button size="small" href={post.url} target="_blank">Read More →</Button>
                  </CardContent>
                </Card>
              ))}
            </Masonry>
          )}
        </Container>

        {/* Contact Section */}
        <Container id="contact" sx={{ py: 10, maxWidth: 600, mx: "auto" }}>
          <Grow in timeout={900}>
            <Box>
              <Typography variant="h4" align="center" color="primary" gutterBottom>Let's Connect</Typography>
              <Box component="form" ref={formRef} onSubmit={sendEmail} mt={4}>
                <TextField name="name" label="Your Name" fullWidth required margin="normal" />
                <TextField name="email" label="Your Email" fullWidth required margin="normal" type="email" />
                <TextField name="title" label="Subject" fullWidth required margin="normal" />
                <TextField name="message" label="Your Message" multiline rows={4} fullWidth required margin="normal" />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Send Message</Button>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 6 }}>
                <IconButton color="primary" href="https://github.com/adashexplorer" target="_blank"><GitHub /></IconButton>
                <IconButton color="primary" href="https://www.linkedin.com/in/dashabinash/" target="_blank"><LinkedIn /></IconButton>
                <IconButton color="primary" href="mailto:abinashdashvssut@gmail.com"><Email /></IconButton>
              </Box>
            </Box>
          </Grow>
        </Container>

        {/* Footer */}
        <Box sx={{ py: 4, textAlign: "center", bgcolor: "white", borderTop: "1px solid #e0e0e0" }}>
          <Typography variant="body2" color="textSecondary">
            © 2025 Abinash Dash · Crafted with passion and code 💻✨
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}