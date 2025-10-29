import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { Upload, Download, Trash2, File } from 'lucide-react'
import Spinner from '@/components/atoms/Spinner'

type FileRec = { id: string; filename: string; file_url: string; file_size: number; uploaded_at: string }

export default function FileManager({ opportunityId }: { opportunityId: string }) {
  const [files, setFiles] = useState<FileRec[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fetchFiles = useCallback(async () => { setLoading(true); const { data } = await supabase.from('files').select('*').eq('opportunity_id', opportunityId).order('uploaded_at', { ascending: false }); setFiles(data || []); setLoading(false) }, [opportunityId])
  useEffect(() => { fetchFiles() }, [fetchFiles])
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file || file.size > 10485760) return toast.error(file ? 'Máx 10MB' : 'Sem arquivo')
    setUploading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser(); const path = `attachments/${opportunityId}/${file.name}`
      const { error: uploadError } = await supabase.storage.from('attachments').upload(path, file, { upsert: false }); if (uploadError) throw uploadError
      const { data: { publicUrl } } = supabase.storage.from('attachments').getPublicUrl(path)
      await supabase.from('files').insert({ opportunity_id: opportunityId, filename: file.name, file_url: publicUrl, file_size: file.size, mime_type: file.type, uploaded_by: user?.id })
      toast.success('Enviado!'); fetchFiles(); e.target.value = ''
    } catch (err: any) { toast.error(err.message || 'Erro') } finally { setUploading(false) }
  }
  const handleDownload = async (fileUrl: string) => {
    try { const path = fileUrl.split('/').slice(-3).join('/'); const { data, error } = await supabase.storage.from('attachments').createSignedUrl(path, 3600); if (error) throw error; window.open(data.signedUrl, '_blank') }
    catch { toast.error('Erro') }
  }
  const handleDelete = async (id: string, fileUrl: string) => {
    if (!confirm('Excluir?')) return
    try { const path = fileUrl.split('/').slice(-3).join('/'); await supabase.storage.from('attachments').remove([path]); await supabase.from('files').delete().eq('id', id); toast.success('Excluído!'); fetchFiles() }
    catch { toast.error('Erro') }
  }
  const fmt = (b: number) => b < 1024 ? `${b}B` : b < 1048576 ? `${(b / 1024).toFixed(1)}KB` : `${(b / 1048576).toFixed(1)}MB`
  const btn = "p-2 hover:scale-110 transition"
  if (loading) return <div className="flex justify-center py-8"><Spinner size="md" /></div>
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><h3 className="text-lg font-semibold text-white">Arquivos</h3>
        <label className="px-4 py-2 bg-[#e90101] hover:bg-[#c10101] text-white font-semibold rounded-lg cursor-pointer flex items-center gap-2">{uploading ? 'Enviando...' : <><Upload className="w-4 h-4" />Upload</>}
          <input type="file" onChange={handleUpload} disabled={uploading} className="hidden" />
        </label>
      </div>
      {files.length === 0 ? <p className="text-gray-400 text-sm">Nenhum arquivo</p> : <div className="space-y-2">{files.map(f => <div key={f.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3"><div className="flex items-center gap-3"><File className="w-5 h-5 text-gray-400" /><div><p className="text-white font-medium text-sm">{f.filename}</p><p className="text-xs text-gray-400">{fmt(f.file_size)} • {new Date(f.uploaded_at).toLocaleDateString('pt-BR')}</p></div></div><div className="flex gap-2"><button onClick={() => handleDownload(f.file_url)} className={`${btn} text-blue-400 hover:text-blue-300`}><Download className="w-4 h-4" /></button><button onClick={() => handleDelete(f.id, f.file_url)} className={`${btn} text-red-400 hover:text-red-300`}><Trash2 className="w-4 h-4" /></button></div></div>)}</div>}
    </div>
  )
}
