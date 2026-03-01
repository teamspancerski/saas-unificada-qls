'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot, Play, Pause } from 'lucide-react'

export default function BotPage() {
 return (
 <div className="container mx-auto py-10 px-4">
 <Card className="border-emerald-500/30 bg-gray-900/60 backdrop-blur-sm">
 <CardHeader>
 <CardTitle className="flex items-center gap-3 text-2xl">
 <Bot className="h-8 w-8 text-emerald-500" />
 Controle do Robô QLS
 </CardTitle>
 </CardHeader>

 <CardContent className="space-y-8 pt-6">
 <div className="flex flex-wrap items-center gap-4">
 <div className="text-lg font-medium">Status atual:</div>
 <Badge variant="outline" className="text-lg px-4 py-2">
 Desligado
 </Badge>
 <Badge variant="secondary" className="text-base">
 BTC/USDT
 </Badge>
 </div>

 <div className="flex flex-wrap gap-4">
 <Button
 size="lg"
 className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[180px]"
 >
 <Play className="mr-2 h-5 w-5" />
 Ligar Robô
 </Button>

 <Button
 size="lg"
 variant="destructive"
 className="min-w-[180px]"
 >
 <Pause className="mr-2 h-5 w-5" />
 Desligar
 </Button>
 </div>

 <div className="pt-4 text-sm text-gray-400">
 Última atualização: há 2 minutos
 </div>
 </CardContent>
 </Card>
 </div>
 )
}
