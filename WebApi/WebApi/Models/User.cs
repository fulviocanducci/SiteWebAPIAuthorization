using System.Data.Entity.ModelConfiguration;

namespace WebApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class UserConfiguration: EntityTypeConfiguration<User>
    {
        public UserConfiguration()
        {
            ToTable("Users");

            HasKey(c => c.Id)
                .Property(c => c.Id)
                .HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)
                .IsRequired();

            Property(c => c.UserName)
                .HasMaxLength(50)
                .IsRequired();

            Property(c => c.Password)
                .HasMaxLength(20)
                .IsRequired();
        }
    }
}