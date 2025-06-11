function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
}
