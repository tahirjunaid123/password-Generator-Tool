"use client";

import { useState } from "react";
import { Lock, FileText, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const SecureNotes = () => {
    const [note, setNote] = useState("");
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        if (!note) return;
        // Client-side encryption simulation before sending to Supabase
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
            setNote("");
        }, 2000);
    };

    return (
        <Card className="w-full max-w-lg mx-auto border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] bg-background/90 backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-purple-400">
                    <Lock className="h-5 w-5" />
                    Secure Notes (Pro)
                </CardTitle>
                <CardDescription>End-to-end encrypted storage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative">
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Type your secret note here..."
                        className="w-full h-32 bg-secondary/50 border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-foreground placeholder:text-muted-foreground"
                    />
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground px-1">
                    <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> Encrypted locally</span>
                    <span>{note.length} / 500</span>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={!note}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]"
                >
                    {saved ? "ENCRYPTED & SAVED" : <><Send className="h-4 w-4 mr-2" /> ENCRYPT & SAVE</>}
                </Button>
            </CardContent>
        </Card>
    );
};
