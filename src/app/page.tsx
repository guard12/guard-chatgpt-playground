"use client";
import { useState } from 'react';

export default function Home() {
  const [idea, setIdea] = useState("");
  const [generatedCompany, setGeneratedCompany] = useState<String>("");
  const [loading, setLoading] = useState(false);

  const prompt = `Generate a possible company with product based on the ${idea} context no longer than 200 characters.`;

  const generateCompany = async (e: any) => {
    e.preventDefault();
    setGeneratedCompany("");
    setLoading(true);

    const response = await fetch("/api/openai-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    let answer = await response.json();
    setGeneratedCompany(answer);
    setLoading(false);
  };

  return (
    <main>
      <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
        Convert your idea into a company.
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        rows={4}
        className="w-3/4 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
        placeholder={
          "e.g. I own 3D lidar interior scanning camera"
        }
        />
      <button
        className="w-3/4 bg-red-400 rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-red-400/80"
        onClick={(e) => generateCompany(e)}
      >
        Generate your company!
      </button>
      {generatedCompany && <div
          className="bg-gray-300 rounded-xl shadow-md p-4"
        >
          <p>{generatedCompany}</p>
        </div>
      }
      </div>
    </main>
  )
}
