// src/pages/CompetitionDetail.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import type { Competition } from '../types';
import PageTransition from '../components/PageTransition';
import ParticipantsModal from '../components/ParticipantsModal';
import CompetitionHeader from '../components/competition/CompetitionHeader';
import CompetitionDescription from '../components/competition/CompetitionDescription';
import CompetitionDetails from '../components/competition/CompetitionDetails';
import CompetitionAdminActions from '../components/competition/CompetitionAdminActions';
import StudentParticipationPanel from '../components/competition/StudentParticipationPanel';
import BackButton from '../components/competition/BackButton';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import { canEditCompetition, isOwnSchoolCompetition, isAccessibleViaRestriction } from '../utils/competitionHelpers';

export default function CompetitionDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for managing participants and joining
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    const fetchCompetition = async () => {
      if (!id || !user) return;
      
      setIsLoading(true);
      try {
        const data = await api.getCompetition(id, user);
        setCompetition(data);
        
        // Check if user has already joined the competition
        if (user.role === 'STUDENT') {
          const joined = await api.hasJoinedCompetition(id, user);
          setHasJoined(joined);
        }
        
        setError('');
      } catch (err) {
        console.error('Failed to fetch competition:', err);
        setError('You do not have permission to view this competition or it does not exist.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompetition();
  }, [id, user]);
  
  // Handler for editing a competition
  const handleEditClick = () => {
    // In a real application, you would navigate to an edit page or show an edit form
    alert("Edit functionality would be implemented here in a real application.");
  };  
  
  // Handler for joining a competition
  const handleJoinCompetition = async () => {
    if (!user || !competition || !id) return;
    
    setIsJoining(true);
    try {
      await api.joinCompetition(id, user);
      setHasJoined(true);
      // Show a success message or notification
      alert('You have successfully joined this competition!');
    } catch (err: any) {
      console.error('Failed to join competition:', err);
      alert(`Failed to join competition: ${err.message || 'Please try again.'}`);
    } finally {
      setIsJoining(false);
    }
  };
  
  // Handler for managing participants
  const handleManageParticipants = () => {
    setShowParticipantsModal(true);
  };
  
  // Render loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  // Render error state
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  // Render not found state
  if (!competition) {
    return <ErrorMessage message="Competition not found" />;
  }
  
  return (
    <PageTransition>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Competition Header */}
        <CompetitionHeader 
          competition={competition}
          isOwnSchoolCompetition={isOwnSchoolCompetition(user, competition)}
          isAccessibleViaRestriction={isAccessibleViaRestriction(user, competition)}
        />
        
        <div className="px-6 py-5">
          {/* Competition Description */}
          <CompetitionDescription description={competition.description} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Competition Details */}
            <CompetitionDetails competition={competition} />
            
            {/* Admin Actions */}
            {user && competition && canEditCompetition(user, competition) && (
              <CompetitionAdminActions
                onEdit={handleEditClick}
                onManageParticipants={handleManageParticipants}
              />
            )}
          </div>
          
          {/* Student Participation Panel */}
          {user?.role === 'STUDENT' && (
            <StudentParticipationPanel
              isJoining={isJoining}
              hasJoined={hasJoined}
              onJoin={handleJoinCompetition}
            />
          )}
          
          {/* Back Button */}
          <BackButton />
        </div>
      </div>

      {/* Participants Modal */}
      <ParticipantsModal
        competitionId={id || ''}
        isOpen={showParticipantsModal}
        onClose={() => setShowParticipantsModal(false)}
      />
    </PageTransition>
  );
}