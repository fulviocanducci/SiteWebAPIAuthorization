using System.Data.Entity.ModelConfiguration;

namespace WebApi.Models
{
    public class Credit
    {
        public int Id { get; set; }
        public string Description { get; set; }
    }

    public class CreditConfiguration: EntityTypeConfiguration<Credit>
    {
        public CreditConfiguration()
        {
            ToTable("Credits");

            HasKey(c => c.Id)
                .Property(c => c.Id)
                .HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)
                .IsRequired();

            Property(c => c.Description)
                .HasMaxLength(50)                
                .IsRequired();         
        }
    }
}