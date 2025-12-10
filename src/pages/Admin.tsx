import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Mail, Check, X, Trash2, Loader2, LogOut, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Comment {
  id: string;
  news_id: string;
  author_name: string;
  content: string;
  is_approved: boolean;
  created_at: string;
  news?: { title: string; slug: string };
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    setLoadingData(true);
    
    const [commentsRes, contactsRes] = await Promise.all([
      supabase
        .from('comments')
        .select('*, news(title, slug)')
        .order('created_at', { ascending: false }),
      supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false }),
    ]);

    if (commentsRes.data) setComments(commentsRes.data);
    if (contactsRes.data) setContacts(contactsRes.data);
    
    setLoadingData(false);
  };

  const handleApproveComment = async (id: string, approve: boolean) => {
    const { error } = await supabase
      .from('comments')
      .update({ is_approved: approve })
      .eq('id', id);

    if (error) {
      toast.error('Gagal mengubah status komentar');
      return;
    }

    setComments(comments.map(c => c.id === id ? { ...c, is_approved: approve } : c));
    toast.success(approve ? 'Komentar disetujui' : 'Komentar ditolak');
  };

  const handleDeleteComment = async (id: string) => {
    const { error } = await supabase.from('comments').delete().eq('id', id);

    if (error) {
      toast.error('Gagal menghapus komentar');
      return;
    }

    setComments(comments.filter(c => c.id !== id));
    toast.success('Komentar dihapus');
  };

  const handleToggleReadContact = async (id: string, isRead: boolean) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ is_read: isRead })
      .eq('id', id);

    if (error) {
      toast.error('Gagal mengubah status pesan');
      return;
    }

    setContacts(contacts.map(c => c.id === id ? { ...c, is_read: isRead } : c));
  };

  const handleDeleteContact = async (id: string) => {
    const { error } = await supabase.from('contact_submissions').delete().eq('id', id);

    if (error) {
      toast.error('Gagal menghapus pesan');
      return;
    }

    setContacts(contacts.filter(c => c.id !== id));
    toast.success('Pesan dihapus');
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const pendingComments = comments.filter(c => !c.is_approved);
  const approvedComments = comments.filter(c => c.is_approved);
  const unreadContacts = contacts.filter(c => !c.is_read);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">Panel Admin</h1>
              <p className="text-muted-foreground">Kelola komentar dan pesan recruitment</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {loadingData ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Tabs defaultValue="comments" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="comments" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Komentar
                  {pendingComments.length > 0 && (
                    <Badge variant="destructive" className="ml-1">{pendingComments.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="contacts" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Recruitment
                  {unreadContacts.length > 0 && (
                    <Badge variant="destructive" className="ml-1">{unreadContacts.length}</Badge>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="comments" className="space-y-6">
                {/* Pending Comments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      Komentar Menunggu Persetujuan
                      <Badge variant="outline">{pendingComments.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pendingComments.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">Tidak ada komentar yang menunggu persetujuan</p>
                    ) : (
                      pendingComments.map(comment => (
                        <div key={comment.id} className="p-4 bg-muted/50 rounded-lg space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-foreground">{comment.author_name}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</p>
                              {comment.news && (
                                <p className="text-xs text-primary mt-1">Pada: {comment.news.title}</p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="text-green-600" onClick={() => handleApproveComment(comment.id, true)}>
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDeleteComment(comment.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-foreground/80">{comment.content}</p>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>

                {/* Approved Comments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      Komentar Disetujui
                      <Badge variant="secondary">{approvedComments.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {approvedComments.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">Belum ada komentar yang disetujui</p>
                    ) : (
                      approvedComments.map(comment => (
                        <div key={comment.id} className="p-4 bg-muted/30 rounded-lg space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-foreground">{comment.author_name}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</p>
                              {comment.news && (
                                <p className="text-xs text-primary mt-1">Pada: {comment.news.title}</p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleApproveComment(comment.id, false)}>
                                <X className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDeleteComment(comment.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-foreground/80">{comment.content}</p>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contacts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pesan Recruitment</CardTitle>
                    <CardDescription>Lamaran dan pertanyaan dari calon karyawan</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contacts.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">Belum ada pesan</p>
                    ) : (
                      contacts.map(contact => (
                        <div 
                          key={contact.id} 
                          className={`p-4 rounded-lg space-y-3 ${contact.is_read ? 'bg-muted/30' : 'bg-primary/5 border border-primary/20'}`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-foreground">{contact.name}</p>
                                {!contact.is_read && <Badge variant="default" className="text-xs">Baru</Badge>}
                              </div>
                              <p className="text-sm text-muted-foreground">{contact.email}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(contact.created_at)}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleToggleReadContact(contact.id, !contact.is_read)}
                              >
                                {contact.is_read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600" 
                                onClick={() => handleDeleteContact(contact.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{contact.subject}</p>
                            <p className="text-foreground/80 mt-2 whitespace-pre-wrap">{contact.message}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
