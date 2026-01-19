import { useState } from 'react';
import { Plus, X, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface Dictionary {
  name: string;
  words: string[];
  color: string;
}

const INITIAL_DICTIONARIES: Dictionary[] = [
  {
    name: 'Root Foreboding',
    words: ['risk', 'concern', 'delay', 'failure', 'investigation', 'warning', 'decline', 'adverse'],
    color: 'from-red-500 to-red-600',
  },
  {
    name: 'Foreboding',
    words: ['non-compliance', 'violation', 'deficiency', 'recall', 'lawsuit', 'penalty', 'contamination'],
    color: 'from-orange-500 to-orange-600',
  },
  {
    name: 'Assurance',
    words: ['approved', 'compliant', 'safe', 'efficacy', 'benefit', 'positive', 'validated', 'certified'],
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'Geopolitical',
    words: ['sanction', 'embargo', 'tariff', 'trade-war', 'instability', 'conflict', 'regulation'],
    color: 'from-purple-500 to-purple-600',
  },
];

interface DictionaryEditorProps {
  onUpdate: (dictionaries: Dictionary[]) => void;
}

export function DictionaryEditor({ onUpdate }: DictionaryEditorProps) {
  const [dictionaries, setDictionaries] = useState<Dictionary[]>(INITIAL_DICTIONARIES);
  const [newWords, setNewWords] = useState<Record<string, string>>({});

  const addWord = (dictionaryName: string) => {
    const word = newWords[dictionaryName]?.trim();
    if (!word) return;

    const updated = dictionaries.map((dict) =>
      dict.name === dictionaryName
        ? { ...dict, words: [...dict.words, word.toLowerCase()] }
        : dict
    );
    setDictionaries(updated);
    setNewWords({ ...newWords, [dictionaryName]: '' });
  };

  const removeWord = (dictionaryName: string, word: string) => {
    const updated = dictionaries.map((dict) =>
      dict.name === dictionaryName
        ? { ...dict, words: dict.words.filter((w) => w !== word) }
        : dict
    );
    setDictionaries(updated);
  };

  const handleUpdateAll = () => {
    onUpdate(dictionaries);
  };

  return (
    <div className="h-full bg-gray-900/50 border border-cyan-500/30 rounded-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-b border-cyan-500/30">
        <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
          <BookOpen className="size-5" />
          Dictionaries
        </h3>
      </div>

      <ScrollArea className="h-[calc(100%-12rem)]">
        <div className="p-4 space-y-4">
          {dictionaries.map((dict) => (
            <div
              key={dict.name}
              className="border border-cyan-500/20 rounded-lg p-4 bg-gray-900/30"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className={`font-semibold bg-gradient-to-r ${dict.color} bg-clip-text text-transparent`}>
                  {dict.name}
                </h4>
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                  {dict.words.length} words
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {dict.words.map((word) => (
                  <Badge
                    key={word}
                    variant="secondary"
                    className="bg-gray-800 text-gray-200 hover:bg-gray-700"
                  >
                    {word}
                    <button
                      onClick={() => removeWord(dict.name, word)}
                      className="ml-1 hover:text-red-400"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newWords[dict.name] || ''}
                  onChange={(e) =>
                    setNewWords({ ...newWords, [dict.name]: e.target.value })
                  }
                  onKeyPress={(e) => e.key === 'Enter' && addWord(dict.name)}
                  placeholder="Add new word..."
                  className="bg-gray-800 border-cyan-500/30 text-sm"
                />
                <Button
                  onClick={() => addWord(dict.name)}
                  size="sm"
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-cyan-500/30 bg-gray-900/50">
        <Button
          onClick={handleUpdateAll}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
        >
          Update All Dictionaries
        </Button>
      </div>
    </div>
  );
}
