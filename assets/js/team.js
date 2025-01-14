document.addEventListener('DOMContentLoaded', function() {
    const inviteForm = document.querySelector('#invite-form');
    const inviteModal = document.querySelector('#invite-modal');
    const successMessage = document.querySelector('#success-message');

    if (inviteForm) {
        inviteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const closeModalBtn = document.querySelector('[data-modal-hide="invite-modal"]');
            if (closeModalBtn) {
                closeModalBtn.click();
            }
            
            successMessage.classList.remove('translate-x-full', 'opacity-0');
            
            setTimeout(() => {
                successMessage.classList.add('translate-x-full', 'opacity-0');
            }, 3000);
            
            inviteForm.reset();
        });
    }

    document.querySelectorAll('input[type="checkbox"]').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const status = this.checked ? 'active' : 'inactive';
            const row = this.closest('tr');
            const memberId = row.dataset.rowId;
            
            console.log(`User ${memberId} status changed to ${status}`);
        });
    });

    // Edit User Form Handler
    const editUserForm = document.querySelector('#editUserForm');
    if (editUserForm) {
        editUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successMessage = document.querySelector('#success-message');
            successMessage.classList.remove('translate-x-full', 'opacity-0');
            
            setTimeout(() => {
                successMessage.classList.add('translate-x-full', 'opacity-0');
            }, 3000);
        });

        // Avatar Upload Preview
        const avatarUpload = document.querySelector('#avatar-upload');
        const avatarPreview = document.querySelector('#avatar-preview');
        
        if (avatarUpload && avatarPreview) {
            avatarUpload.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        avatarPreview.src = e.target.result;
                    }
                    reader.readAsDataURL(file);
                }
            });
        }
    }
});
