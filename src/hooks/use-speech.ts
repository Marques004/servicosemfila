import { useCallback, useEffect, useState } from "react";

/**
 * Leitura em voz alta usando a voz do próprio navegador.
 * Só um texto é lido por vez; `speakingId` diz qual está sendo lido.
 */
export function useSpeech() {
  const [supported, setSupported] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeakingId(null);
  }, []);

  const speak = useCallback(
    (id: string, text: string) => {
      if (!supported) return;
      const synth = window.speechSynthesis;
      synth.cancel();
      if (speakingId === id) {
        setSpeakingId(null);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";
      utterance.rate = 0.85;
      const voice = synth
        .getVoices()
        .find((item) => item.lang.replace("_", "-").startsWith("pt-BR"));
      if (voice) utterance.voice = voice;
      utterance.onend = () => setSpeakingId((current) => (current === id ? null : current));
      utterance.onerror = utterance.onend;
      synth.speak(utterance);
      setSpeakingId(id);
    },
    [supported, speakingId],
  );

  return { supported, speakingId, speak, stop };
}
