'use client'
import { Player } from "@lottiefiles/react-lottie-player";
import { Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReplyIcon from "@mui/icons-material/Reply";

export default function PaginaEmConstrucao() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
      <div>
        <h1 style={{ textAlign: "center" }}>Página em construção</h1>
      <Player
        autoplay
        loop
        src="https://lottie.host/c5e0ae36-0697-4f25-a469-697de4e9cad8/nKqYZiZl9K.json"
              style={{
                  height: "600px", width: "600px",
                  margin: "auto",
              }}
      >
          </Player>
          <Link href="/">
              <Button
                  style={{
                        position: 'fixed',
                        top: '20px',
                        left: '20px',
                        zIndex: 9999,
                    }}
                  variant="contained">
            <ReplyIcon />
            Voltar
          </Button>
        </Link>
      </div>


  ) : null;
}
