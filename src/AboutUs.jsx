import React from "react";
import { motion } from "framer-motion";
import Header from "./Header";

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: "102203718 - Geetansh Mohindru",
      email: "gmohindru_be22@thapr.edu",
    },
    {
      id: 2,
      name: "102383012 - Gitika Goyal",
      email: "ggoyal_be22@thapar.edu",
    },
    {
      id: 3,
      name: "102203421 - Naman Kumar",
      email: "nkumar_be22@thapar.edu",
    },
    {
      id: 4,
      name: "102203436 - Nandini Jain",
      email: "njain_be22@thapar.edu",
    },
    {
      id: 5,
      name: "102203397 - Pooja Maheshwari",
      email: "pmaheshwari_be22@thapar.edu",
    },
  ];

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto",
      fontFamily: "Poppins, sans-serif",
      backgroundColor: "#f9fafc",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      textAlign: "center",
      fontSize: "36px",
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: "30px",
    },
    team: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    memberCard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      transition: "transform 0.3s",
    },
    memberName: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#34495e",
      marginBottom: "8px",
    },
    memberEmail: {
      fontSize: "16px",
      color: "#2d87f0", // Email link color
      textDecoration: "none", // Remove underline
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05 },
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.heading}>Meet Our Team</h1>
        <div style={styles.team}>
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              style={styles.memberCard}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
            >
              <h2 style={styles.memberName}>{member.name}</h2>
              <p>
                {member.email ? (
                  <a
                    href={`mailto:${member.email}`}
                    style={styles.memberEmail}
                  >
                    {member.email}
                  </a>
                ) : (
                  "Not Provided"
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutUs;
