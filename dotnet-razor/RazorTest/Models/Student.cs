using RazorTest.Models;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

public class Student
{
    [Key]
    [DisplayName("id")]
    public int Id { get; set; }

    [Required(ErrorMessage ="Name shouldn't be null")]
    [StringLength(80, ErrorMessage ="Name shouldn't have more than 80 chars")]
    [MinLength(5, ErrorMessage ="Name should have more than 5 chars")]
    [DisplayName("Fullname")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email shouldn't be null")]
    [EmailAddress(ErrorMessage = "Invalid e-mail")]
    [DisplayName("E-mail")]
    public string Email { get; set; } = string.Empty;

    public List<Premium> Premiums { get; set; } = new();
}
